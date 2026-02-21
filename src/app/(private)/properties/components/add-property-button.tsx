"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import UpsertPropertyForm from "./upsert-property-form";

const AddPropertyButton = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Imóvel
                </Button>
            </DialogTrigger>

            <UpsertPropertyForm
                onSuccess={() => {
                    setIsOpen(false);
                }}
                isOpen={isOpen}
            />
        </Dialog>
    );
};

export default AddPropertyButton;
