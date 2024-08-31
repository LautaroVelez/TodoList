'use strict'
'use client'

import React, { useEffect, useState } from "react";
import { Input, Button, Divider,Card, CardHeader, CardBody,Checkbox } from '@nextui-org/react';
import { IoMdAdd } from "react-icons/io";

export default function Landing() {
    const [descTask, setDescTask] = useState<string>('')
    const [ListOfTasks, setListOfTasks] = useState<Array<Task>>([]);


    interface Task {
        des: string;
        id: number;
        type: "completed" | "incompleted";
    }


    function createTask(): Task {
        return {
            des: descTask,
            id: ListOfTasks.length,
            type: "incompleted"
        };
    }



    function HandleAddTask(e: React.FormEvent) {
        e.preventDefault()
        const task = createTask()
        setListOfTasks([...ListOfTasks, task]);
    }

    function handleType(){
        
    }

   


    return (
        <div className="bg-gradient-to-r from-purple-500 to-purple-900 h-full min-h-screen items-center ">
            <ul className="text-white">
                <li>eliminar tareas</li>
                <li>marcar como completada</li>
                <li>filtrar tareas incompletas, ocmpletas, todas</li>
                <li>las tareas deben durar por mas que se recarge la pagina</li>
                <li>optimizar el rendimiento ver usecallback o react.memo</li>
            </ul>
            <div className='w-full justify-center flex items-center'>
                <Card isBlurred className="border-none bg-background/60 bg-100/50 w-[600px] p-8 pb-52" shadow="lg">
                    <CardHeader>
                        <div className="w-full">
                            <h1 className="text-white font-bold">My tasks</h1>
                            <Divider orientation='horizontal' className="bg-white" />
                        </div>
                    </CardHeader>

                    <CardBody>
                        <form onSubmit={HandleAddTask}>
                            <div className="flex w-full justify-between">
                                <Input placeholder="Add a task" value={descTask} className="w-[70%]" required onChange={(e) => setDescTask(e.target.value)} />
                                <Button className="w-[150px] bg-gradient-to-r from-slate-600 to-gray-800" type="submit" isIconOnly color="secondary" endContent={<IoMdAdd />}></Button>
                            </div>
                            <Divider orientation='horizontal' className="bg-white" />
                        </form>



                        {ListOfTasks.map((task, index) => (
                            <>
                               
                                    <div key={index} className="flex mt-3 justify-between outline outline-1 items-center p-3 h-full rounded-2xl outline-white text-white">
                                        <div className="flex h-full w-full items-center pl-2 text-center">
                                            <Checkbox color="secondary" onChange={handleType} lineThrough classNames={{ label: "w-full text-white pl-2" }}>{task.des}{task.id}</Checkbox>
                                        </div>
                                    </div>
                            </>
                        ))}
                    </CardBody>
                </Card>


            </div>
        </div >
    )
}