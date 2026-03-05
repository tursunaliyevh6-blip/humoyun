'use client'
import Navbarpage from "@/components/navbar";
import { useGetCategories } from "@/hook/todo";
import { Pen, Trash, Trash2 } from "lucide-react";
import Link from "next/link";


export default function Page() {
    const category = useGetCategories()

    const handleRename = (id) => {
        console.log("Renaming category with id:", id);
    }
    const handleDelete = (id) => {
        console.log("Deleting category with id:", id);
    }

    return (
        <div>
            <Navbarpage />
            <div className="categories grid grid-cols-4 gap-4">
                {category?.data?.data.map((item) => (
                    <div className="category p-2 border-2 rounded-2xl" key={item.id}>
                        <Link href={`/admin/${item.id}`} >
                            <img src={item.image_url} alt={item.name} />
                        </Link>

                        <h1>{item.name}</h1>
                        
                            
                            <div className="flex  gap-2 ">

                                <button className="ya" onClick={() => handleRename(item.id)}>
                                    <Pen size={20} />
                                </button>

                                <button className="och" onClick={() => handleDelete(item.id)}>
                                    <Trash2 size={20} />
                                </button>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}