import {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Select, TextInput} from "flowbite-react";
import {HiPlus} from "react-icons/hi";

export default function AddUserModal({setUsers}) {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`/api/users/new`, {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                }),
            });

            if (response.ok) {
                // router.push("/panel/users");
                console.log("User added successfully")
                const result = await response.json();
                console.log('response id', result._id)
                setUsers(prevUsers => [...prevUsers, {name, email, role, _id:result._id}])

                setOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button color="blue" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Add user
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
                <form action="" onSubmit={handleSubmit}>
                    <ModalHeader>Add new user</ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="firstName">Full Name</Label>
                                <div>
                                    <TextInput
                                        id="firstName"
                                        name="name"
                                        placeholder="Bonnie"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div>
                                    <TextInput
                                        id="email"
                                        name="email"
                                        placeholder="example@company.com"
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div>
                                    <TextInput
                                        id="password"
                                        name="password"
                                        placeholder="*******"
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="department">Role</Label>
                                <div>
                                    <Select name='role'
                                            onChange={(event) => setRole(event.target.value)}
                                            value={role}
                                            id="role" required
                                    >
                                        <option value='USER'>User</option>
                                        <option value='ADMIN'>Admin</option>

                                    </Select>
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="blue" type='submit' >
                            Add user
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}