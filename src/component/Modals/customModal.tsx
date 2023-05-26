import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import UserModal from "./userModal";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CustomModal(props: any) {
    const {
        title = "Title",
        isOpen,
        toggle,
        onCancel,
        cancelText,
        onSubmit,
        submitText,
        onDelete,
        deleteText,
        children,
        setData
    } = props;
    const [userPopup, setUserPopup] = useState(false);
    const [localStorageData, setLocalStorageData] = useState<any>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setData(event.target.value as string);
    };

    const handleClick = () => {
        setUserPopup(true);
    };

    const toggleUserPopup = () => {
        setUserPopup(false);
    };

    useEffect(() => {
        const localStorageOptions = localStorage.getItem("userData");
        if (localStorageOptions) {
            const parsedOptions = JSON.parse(localStorageOptions);
            setLocalStorageData(parsedOptions);
        }
    }, []);

    const handleMenuItemClick = (value: any) => {
        const jsonString = JSON.stringify(value);
        setData(jsonString);
        console.log(555, jsonString);
        localStorage.setItem("selectedValue", jsonString);
    };

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} style={{ marginTop: "5%" }}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <Button onClick={handleClick} >Add Client</Button>
                <ModalBody>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Add client</InputLabel>
                            <Select
                                placeholder=" Search Client"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Client"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Brad</MenuItem>
                                <MenuItem value={20}>Adam</MenuItem>
                                <MenuItem value={30}>Angela</MenuItem>
                                {
                                    localStorageData && localStorageData.map((option: any) => {
                                        return (
                                            <MenuItem
                                                onClick={() => handleMenuItemClick(option)}
                                                key={option}
                                                value={option.name}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    {children}
                </ModalBody>
                <ModalFooter>
                    {onCancel && (
                        <Button color="secondary" onClick={onCancel}>
                            {cancelText || "Cancel"}
                        </Button>
                    )}
                    {onDelete && (
                        <Button color="primary" onClick={onDelete}>
                            {deleteText || "Delete"}
                        </Button>
                    )}
                    {onSubmit && (
                        <Button color="primary" onClick={onSubmit}>
                            {submitText || "Submit"}
                        </Button>
                    )}
                </ModalFooter>

            </Modal>
            {/* {userPopup && (
    <UserModal toggle={toggleUserPopup} isOpen={userPopup} />
  )} */}
            <UserModal
                isOpen={userPopup}
                toggle={toggleUserPopup}
                onCancel={toggleUserPopup}
            />
        </>
    );
}
