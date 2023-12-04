import React, { useState, useEffect } from 'react';

/*
  This component is responsible of rendering individual applicant dialogs
 */
const Applicant = ({ onAddApplicant, onCancelAdd, applicantToEdit, onCancelEdit, isFirstApplicant }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isPrimary, setIsPrimary] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const [isEditingPrimary, setIsEditingPrimary] = useState(false);

    // Validation state variables
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [emailError, setEmailError] = useState('');

    // Accumulative Validation state variables
    const [emailWarning, setEmailWarning] = useState('');

    useEffect(() => {
        if (applicantToEdit) {
            setFirstName(applicantToEdit.firstName);
            setLastName(applicantToEdit.lastName);
            setMobileNumber(applicantToEdit.mobileNumber || '');
            setEmail(applicantToEdit.email || '');
            setIsPrimary(applicantToEdit.isPrimary || false);
        } else {
            setFirstName('');
            setLastName('');
            setMobileNumber('');
            setEmail('');
            setIsPrimary(isFirstApplicant);
        }
    }, [applicantToEdit]);

    useEffect(() => {
        if (isPrimary && isEditingPrimary) {
            setShowNote(true);
        }
    }, [isPrimary, isEditingPrimary]);

    const handleAddApplicant = () => {

        if (!validateForm()) {
            return;
        }

       if(onAddApplicant({ firstName, lastName, mobileNumber, email, isPrimary }).status === "failure"){
           setEmailWarning('Emails are not unique amongst applicants.');
       }else{
           setEmailWarning('');
       }
    };

    const validateForm = () => {
        // Basic validation rules
        let isValid = true;

        if (!/^[a-zA-Z]{1,50}$/.test(firstName)) {
            setFirstNameError('Please enter a valid first name (max 50 characters).');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (!/^[a-zA-Z]{1,50}$/.test(lastName)) {
            setLastNameError('Please enter a valid last name (max 50 characters).');
            isValid = false;
        } else {
            setLastNameError('');
        }

        if (!/^(04)\d{8}$/.test(mobileNumber)) {
            setMobileNumberError('Please enter a valid mobile number (start with 04 and has 9 digits).');
            isValid = false;
        } else {
            setMobileNumberError('');
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError('');
        }

        return isValid;
    };

    const handleCancel = () => {
        if (onCancelEdit) {
            onCancelEdit();
        } else if (onCancelAdd) {
            onCancelAdd();
        }
    };

    return (
        <div className="Applicant-container">
            <h3>{applicantToEdit ? `Edit Applicant (${firstName})` : 'Add Applicant'}</h3>
            <label>
                First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={55} // Set maximum length to 55 characters
                />
                {firstNameError && <div className="ValidationError">{firstNameError}</div>}
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={55} // Set maximum length to 55 characters
                />
                {lastNameError && <div className="ValidationError">{lastNameError}</div>}
            </label>
            <br />
            <label>
                Mobile Number:
                <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength={55} // Set maximum length to 55 characters
                />
                {mobileNumberError && <div className="ValidationError">{mobileNumberError}</div>}
            </label>
            <br />
            <label>
                Email:
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={55} // Set maximum length to 55 characters
                />
                {emailError && <div className="ValidationError">{emailError}</div>}
            </label>
            <br />
            <label>
                Primary Applicant:
                <input
                    type="checkbox"
                    checked={isPrimary}
                    onChange={() => {
                        setIsPrimary(!isPrimary);
                        setIsEditingPrimary(true);
                    }}
                    disabled={isFirstApplicant}
                />
                {showNote && isPrimary && (
                    <div className="IsPrimary-Note">Note: only one applicant can be primary. Setting this revokes other applicants from being primary</div>
                )}
            </label>
            <br />
            {emailWarning && <div className="Warning-message">{emailWarning}</div>}
            <button onClick={handleAddApplicant}>Ok</button>
            <button className="cancel" onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
};

export default Applicant;
