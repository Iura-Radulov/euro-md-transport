"use client";
import {Button, Label, Select, TextInput} from "flowbite-react";
import {FaBackward} from "react-icons/fa";

import {useRouter} from "next/navigation";

export default function UserForm({handleSubmit,  name,email, role, password, setName, setEmail, setPassword, setRole}){
    const router = useRouter()
    return (
        <section className='p-5'>
            <div className='mb-4'>
                <Button onClick={()=>router.push("/panel/users")}>
                    <FaBackward size={'1.4em'}/>
                </Button>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className='flex flex-wrap gap-5 mb-4'>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="nameEn" value="User name" />
                        </div>
                        <TextInput
                            id="nameEn"
                            placeholder="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="namePl" value="User email" />
                        </div>
                        <TextInput
                            id="namePl"
                            placeholder="name Pl"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="nameUk" value="User password" />
                        </div>
                        <TextInput
                            id="nameUk"
                            placeholder="*****"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}

                        />
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="role" value="Role" />
                        </div>
                        <Select name='role'
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                                id="role" required>
                            <option value='USER'>User</option>
                            <option value='ADMIN'>Admin</option>

                        </Select>
                    </div>

                </div>

                <div className='flex justify-center mt-4'>
                    <Button color="success" type={'submit'}>
                        Save
                    </Button>
                </div>
            </form>
        </section>
        )
    }
