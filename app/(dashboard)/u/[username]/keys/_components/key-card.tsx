"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";

interface KeyCardProps {
    value?: string | null;
};

export const KeyCard = ({value}: KeyCardProps) => {
    const [isShow, setShow] = useState(false);
    return  (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-start gap-x-10">
                <p className="font-semibold shrink-0">
                    Stream Key
                </p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input 
                            value={value || ""}
                            type={isShow ? "text" : "password"}
                            disabled
                            placeholder="Stream key"
                        />
                        <CopyButton value={value || ""}/>
                    </div>
                    <Button 
                        onClick={() => setShow(!isShow)}
                        size="sm"
                        variant="link"
                    >
                        {isShow ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}