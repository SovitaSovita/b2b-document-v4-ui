import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from '@nextui-org/react'
import React from 'react'

function NewFormModal({ isOpen, onClose }: any) {

    const animals = [
        { key: "greeting", label: "Greeting" },
        { key: "common", label: "Common" },
        { key: "secretary", label: "Secretary" },
        { key: "open", label: "Open" },
        { key: "resolution", label: "Resolution" },
    ];
    return (
        <>
            <Modal
                size={'5xl'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Form</ModalHeader>
                            <ModalBody>
                                <div className='flex'>
                                    <Select
                                        items={animals}
                                        placeholder="Select Form Type"
                                        className="max-w-xs"
                                    >
                                        {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
                                    </Select>
                                    <Input type="email"
                                        className="max-w-xs overflow-hidden"
                                        label="Document Name"
                                        labelPlacement="outside"
                                    />
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="secondary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default NewFormModal