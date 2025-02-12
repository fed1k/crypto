"use client";

import { Button } from "@/components/ui/button"
import { maskEmail, uidToNumber } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [user, setUser] = useState({ email: "", uid: "" })
    useEffect(() => {
        const tempUser = JSON.parse(sessionStorage.getItem("user"))
        setUser(tempUser)

    }, [])

    console.log(user)
    return (
        <div className="p-8">
            <p>{user.email ? maskEmail(user?.email) : ""}</p>
            <p>{user.uid ? uidToNumber(user?.uid) : ""}</p>
            <div>
                <Button><Link href="/deposit">Deposit</Link></Button>
                {/* <button></button> */}
            </div>
        </div>
    )
}

export default DashboardPage