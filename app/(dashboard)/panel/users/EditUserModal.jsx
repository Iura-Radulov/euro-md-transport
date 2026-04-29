"use client"
import {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Select, TextInput} from "flowbite-react";
import {HiPencilAlt} from "react-icons/hi";

export default function EditUserModal({userId, setUsers}) {
    const [isOpen, setOpen] = useState(false);
    // Initialize with safe defaults so inputs are controlled from mount
    const [userData, setUserData] = useState({ name: '', email: '', role: 'USER', password: '' })

        const fetchUser =async ()=>{
        try {
            const response = await fetch(`/api/users/${userId}`);
            if (!response.ok) throw new Error('Failed to load user');
            const data = await response.json()
            console.log(data)
            // Map missing fields to defaults to avoid uncontrolled -> controlled warnings
            setUserData({
                name: data?.name ?? '',
                email: data?.email ?? '',
                role: data?.role ?? 'USER',
                // keep password empty for security; user can enter a new one
                password: ''
            })
            // Open modal after data is set so inputs render controlled values immediately
            setOpen(true);
        } catch (err) {
            console.error('fetchUser error', err);
            setOpen(false);
        }


        }



  async function handleEdit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password ?? null,
                    role: userData.role,
                }),
            });

            if (response.ok) {

                console.log("User updated successfully")
                console.log(response)
                setUsers(prevUsers => prevUsers.map(user => user._id === userId ? { ...user, name: userData.name, email: userData.email, role: userData.role } : user))

                setOpen(false);

            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Button size="sm" color="blue" onClick={() =>  fetchUser()}>
                <div className="flex items-center gap-x-2">
                    <HiPencilAlt className="h-5 w-5" />
                    Edit
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
                <form action="" onSubmit={handleEdit}>
                    <ModalHeader>Edit user</ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="firstName">Name</Label>
                                <div>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={userData.name}
                                        onChange={(event) => setUserData({...userData, name: event.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div>
                                    <TextInput
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={(event) => setUserData({...userData, email: event.target.value})}
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="role">Role</Label>
                                <div>
                                    <Select name='role'
                                            value={userData.role}
                                            onChange={(event) => setUserData({...userData, role: event.target.value})}
                                            id="role" required
                                    >
                                        <option value='USER'>User</option>
                                        <option value='ADMIN'>Admin</option>

                                    </Select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div>
                                    <TextInput
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        type="password"
                                        value={userData.password}
                                        onChange={(event) => setUserData({...userData, password: event.target.value})}
                                    />
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="blue" type='submit' >
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}