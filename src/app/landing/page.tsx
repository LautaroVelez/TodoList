'use strict'
'use client'

import React, {useEffect, useState} from "react";
import {
    Input,
    Button,
    Divider,
    Card,
    CardHeader,
    CardBody,
    Checkbox, ButtonGroup
} from '@nextui-org/react';
import {IoMdAdd} from "react-icons/io";
import Image from 'next/image'
import illustration from '../../../public/illustration.png'
import plant from '../../../public/plant.png'
import {FaRegTrashAlt} from "react-icons/fa";
import {AnimatePresence, motion} from "framer-motion";


export default function Landing() {
    const [descTask, setDescTask] = useState<string>('')
    const [ListOfTasks, setListOfTasks] = useState<Array<Task>>([]);
    const [filterList, setFilterList] = useState<Array<Task>>([]);
    const [type, setType] = useState<"uncompleted" | "completed">("uncompleted");

    const [selectedType, setSelectedType] = useState<string>()
    const filters = ["all", "completed", "uncompleted"]
    const [backgroundColor, setBackgroundColor] = useState("bg-[#e6b78f]");


    interface Task {
        des: string;
        id: number;
        type: "uncompleted" | "completed";
    }


    function createTask(): Task {
        return {
            des: descTask,
            id: (new Date()).getTime(),
            type: "uncompleted"
        };
    }


    function HandleAddTask(e: React.FormEvent) {
        e.preventDefault()
        const task = createTask()
        setListOfTasks([...ListOfTasks, task])
        setDescTask('');
    }


    function handleType(id: number) {
        setListOfTasks(ListOfTasks.map(task => {
            if (task.id === id) {
                const newType = task.type === "completed" ? "uncompleted" : "completed";

                return {...task, type: newType};
            }
            return task;
        }));
    }


    function hanldeDelete(id: number) {
        setListOfTasks(ListOfTasks.filter((task) => task.id !== id))
    }

    function handleFilterButtonClick(type:string) {
        switch (type) {
            case "completed":
                setFilterList(ListOfTasks.filter(task => task.type === "completed"))
                setSelectedType(type)
                break;
            case "uncompleted":
                setFilterList(ListOfTasks.filter(task => task.type === "uncompleted"))
                setSelectedType(type)
                break;
            case "all":
                setFilterList(ListOfTasks)
                setSelectedType(type)
                break;
        }
    }

    useEffect(() => {
        setFilterList(ListOfTasks)

        if (ListOfTasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(ListOfTasks));
        }

    }, [ListOfTasks]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const parsedTasks = JSON.parse(storedTasks);
            setFilterList(parsedTasks);
            setListOfTasks(parsedTasks);
        }
    }, []);


    return (
        <>
            <div
                className="bg-gradient-to-tr from-orange-400 to-orange-300 h-full min-h-screen flex items-center justify-center relative">
                <div className='w-full justify-center flex items-center h-full'>

                    <Card
                        className="border-none bg-background/60 bg-100/50 w-[600px] md:h-[600px] h-[700px] p-8 pb-52"
                        shadow="md">

                        <div className="w-full">
                            <h1 className="text-white drop-shadow-2xl text-center underline text-8xl tasksOracion">My
                                Tasks</h1>
                            <div className={'flex w-full justify-center my-3'}>


                                {filters.map((type, index) => (
                                    <button
                                        onClick={() => handleFilterButtonClick(type)}
                                        className={`button first-letter:uppercase ${selectedType === type ? "active" : ""}`}
                                        key={index}>{type}</button>
                                ))}


                            </div>
                            <form onSubmit={HandleAddTask}>

                                <div className="flex w-full justify-between items-center transition">
                                    <Input placeholder="Add a task" value={descTask} color={'default'}
                                           radius={'sm'}
                                           className="w-[70%] font-bold first-letter:uppercase" required
                                           onChange={(e) => setDescTask(e.target.value)}/>
                                    <Button className="buttonAdd w-[150px] bg-[#aecd68]"
                                            type="submit"
                                            isIconOnly color="secondary"
                                            endContent={<IoMdAdd className={'size-7 text-black'}/>}></Button>
                                </div>

                            </form>
                        </div>


                        <div className="h-[320px] mt-2">
                            <div className="relative h-full overflow-y-auto overflow-x-hidden">

                                {filterList.map((task, index) => {
                                    return (

                                        <div key={task.id}
                                             className={` ${task.type === "completed" ? "bg-[#E6B78F61]" : "bg-[#e6b78f]"} p-4 flex animate-appearance-in items-center justify-between rounded-xl mt-3`}>
                                            <Checkbox color="success" onChange={() => {
                                                handleType(task.id)

                                            }}
                                                      isSelected={task.type === "completed"}
                                                      lineThrough
                                                      classNames={{label: "w-full text-[#71432D]  font-bold pl-2"}}>
                                                <p
                                                    className={'first-letter:uppercase'}>{task.des}</p>
                                            </Checkbox>
                                            <span><button
                                                onClick={() => hanldeDelete(task.id)}><FaRegTrashAlt
                                                className={'text-[#e8e8e8] hover:text-red-600 transition'}/></button></span>
                                        </div>


                                    )
                                })}

                            </div>
                        </div>
                    </Card>

                    <div className="absolute bottom-0 right-0">
                        <Image src={illustration} alt={'illustration'} width={300} height={200} priority
                               className="object-cover  md:block hidden"/>
                    </div>
                    <div className="absolute bottom-0 left-0">
                        <Image src={plant} alt={'plant'} width={200} height={200} priority
                               className="object-cover  md:block hidden"/>
                    </div>

                </div>

            </div>
        </>
    )
}