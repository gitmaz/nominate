import React, { useState, useEffect } from 'react';
import './Applicants.css';
import Applicant from './../Applicant';
import { v4 as uuidv4 } from 'uuid';

const Applicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [addingApplicant, setAddingApplicant] = useState(false);
    const [editingApplicant, setEditingApplicant] = useState(null);
    const [primaryWarning, setPrimaryWarning] = useState('');
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });

    useEffect(() => {

        //TODO: move all asyncs which communicate to backend in services folder (for ex services/api.service.js)
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/applicants');
                if (response.ok) {
                    const data = await response.json();
                    setApplicants(data);
                } else {
                    console.error('Error fetching applicants:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching applicants:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const hasPrimaryApplicant = applicants.some((applicant) => applicant.isPrimary);
        if (applicants.length > 0 && !hasPrimaryApplicant) {
            setPrimaryWarning('Warning: You need to set one applicant as primary.');
            setDisableSaveButton(true);
        } else {
            setPrimaryWarning('');
            setDisableSaveButton(false);
        }
    }, [applicants]);

    const handleEditApplicant = (applicant) => {
        setAddingApplicant(false);
        setEditingApplicant(applicant);
    };
    
    const handleAddOrUpdateApplicant  = ({ firstName, lastName, mobileNumber, email, isPrimary }) => {
        if (hasDuplicates(email, editingApplicant?.id)) {
            return { status: 'failure', reason: 'has duplicates' };
        }

        if (isPrimary) {
            const updatedApplicants = applicants.map((applicant) => ({
                ...applicant,
                isPrimary: false,
            }));
            setApplicants(updatedApplicants);
        }

        if (editingApplicant) {
            setApplicants((prevApplicants) =>
                prevApplicants.map((applicant) =>
                    applicant.id === editingApplicant.id
                        ? { ...applicant, firstName, lastName, mobileNumber, email, isPrimary }
                        : applicant
                )
            );
            setEditingApplicant(null);
        } else {
            const newApplicant = {
                id: uuidv4(),
                firstName,
                lastName,
                mobileNumber,
                email,
                isPrimary: applicants.length === 0 ? true : isPrimary,
            };

            setApplicants((prevApplicants) => [...prevApplicants, newApplicant]);
        }
        setAddingApplicant(false);

        return { status: 'success' };
    };

    

    const handleDeleteApplicant = (applicant) => {
        setApplicants((prevApplicants) => prevApplicants.filter((a) => a.id !== applicant.id));
    };

    const handleCancelEdit = () => {
        setEditingApplicant(null);
        setAddingApplicant(false);
    };

    const handleCancelAdd = () => {
        setAddingApplicant(false);
    };

    //TODO: move all asyncs which communicated to backend in services folder (for ex services/api.service.js)
    const handleSaveApplicants = async () => {
        // Save the list of applicants to the JSON Server
        // TODO: make this working - currently has an issue with uuids
        /* const response = await fetch('http://localhost:3001/applicants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicants),
        }); */

        const response = { ok: false };

        if (response.ok) {
            console.log('Applicants saved successfully!');
            setSaveMessage({ text: 'Applicants saved successfully!', type: 'success' });
        } else {
            console.error('Error saving applicants:', response.statusText);
            setSaveMessage({ text: 'Saving to the server is to be implemented!', type: 'error' });
        }

        setTimeout(() => setSaveMessage({ text: '', type: '' }), 3000);
    };

    const hasDuplicates = (email, currentApplicantId) => {
        const emailSet = new Set();
        let hasDuplicateEmail = false;

        applicants.forEach((applicant) => {
            if ((currentApplicantId && applicant.id !== currentApplicantId) || !currentApplicantId) {
                if (applicant.email === email) {
                    hasDuplicateEmail = true;
                }
            }

            if (emailSet.has(applicant.email)) {
                hasDuplicateEmail = true;
            } else {
                emailSet.add(applicant.email);
            }
        });

        return hasDuplicateEmail;
    };

    return (
        <div className="Applicants-container">
            <h2>Applicant List</h2>
            {loading ? (
                <p>Loading... Please wait.</p>
            ) : applicants.length > 0 || addingApplicant ? (
                <ul className="Applicant-list">
                    {applicants.map((applicant) => (
                        <li key={applicant.id} className="Applicant-list-item">
                            <div className="Applicant-list-item-line">
                                <div>
                                    <span>{applicant.firstName} {applicant.lastName}</span>
                                    <span> - {applicant.email}</span>
                                    <span> - {applicant.mobileNumber}</span>
                                </div>
                                {!editingApplicant && !addingApplicant && (
                                    <div className="Applicant-list-item-line-buttons">
                                        <button onClick={() => handleEditApplicant(applicant)}>Edit</button>
                                        <button onClick={() => handleDeleteApplicant(applicant)} className="delete">
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            {(editingApplicant && editingApplicant.id === applicant.id) && (
                                <Applicant
                                    onAddOrUpdateApplicant={handleAddOrUpdateApplicant }
                                    onCancelAdd={handleCancelAdd}
                                    applicantToEdit={editingApplicant}
                                    onCancelEdit={handleCancelEdit}
                                />
                            )}
                        </li>
                    ))}
                    {addingApplicant && (
                        <li key="new-applicant" className="Applicant-list-item">
                            <Applicant
                                onAddOrUpdateApplicant={handleAddOrUpdateApplicant }
                                onCancelAdd={handleCancelAdd}
                                isFirstApplicant={applicants.length === 0}
                            />
                        </li>
                    )}
                </ul>
            ) : (
                <p className="Applicant-not-found">Yet to be assigned.</p>
            )}
            {!editingApplicant && (
                <button onClick={() => setAddingApplicant(true)} className="Add-applicant-button">
                    {applicants.length === 0 ? 'Add primary applicant' : 'Add new applicant'}
                </button>
            )}
            {applicants.length > 0 && !addingApplicant && (
                <div className={`save-button-wrapper ${saveMessage.type}`}>
                    {primaryWarning && <div className="Warning-message">{primaryWarning}</div>}
                    {saveMessage.text && (
                        <div className={`Save-message ${saveMessage.type}`}>
                            {saveMessage.text}
                        </div>
                    )}
                    <button onClick={handleSaveApplicants} className="Save-button" disabled={disableSaveButton}>
                        Save Applicants
                    </button>
                </div>
            )}
        </div>
    );
};

export default Applicants;
