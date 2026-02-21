"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { upsertProperty } from "../actions";
import {
    upsertPropertySchema,
    type UpsertPropertyFormData,
} from "../schemas/upsert-property-schema";
import type { Property } from "../types/property";

interface UpsertPropertyFormProps {
    onSuccess?: () => void;
    property?: Property;
    isOpen: boolean;
}

const UpsertPropertyForm = ({
    property: entity,
    onSuccess,
    isOpen,
}: UpsertPropertyFormProps) => {
    const defaultValues = {
        id: entity?.id,
        title: entity?.title || "",
        description: entity?.description || "",
        price: entity?.price ?? 0,
        isActive: entity?.isActive ?? true,
    };

    const form = useForm<UpsertPropertyFormData>({
        shouldUnregister: true,
        resolver: zodResolver(upsertPropertySchema),
        defaultValues,
    });

    useEffect(() => {
        if (isOpen) {
            form.reset({
                id: entity?.id,
                title: entity?.title || "",
                description: entity?.description || "",
                price: entity?.price ?? 0,
                isActive: entity?.isActive ?? true,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, form, entity]);

    const upsertPropertyAction = useAction(upsertProperty, {
        onSuccess: ({ data }) => {
            if (!data?.success) {
                if (data?.fieldErrors) {
                    Object.entries(data.fieldErrors).forEach(([field, message]) => {
                        form.setError(field as keyof UpsertPropertyFormData, {
                            type: "manual",
                            message: message as string,
                        });
                    });
                    return;
                }

                if (data?.serverError) {
                    toast.error(data.serverError);
                    return;
                }

                toast.error("Erro ao salvar imóvel.");
                return;
            }

            toast.success(
                entity
                    ? "Imóvel atualizado com sucesso!"
                    : "Imóvel adicionado com sucesso!"
            );

            onSuccess?.();
        },
    });

    const onSubmit = async (values: UpsertPropertyFormData) => {
        await upsertPropertyAction.execute({ ...values, id: entity?.id });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {entity ? "Editar Imóvel" : "Adicionar Imóvel"}
                </DialogTitle>
                <DialogDescription>
                    {entity
                        ? "Edite os detalhes do imóvel."
                        : "Preencha os detalhes do novo imóvel."}
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex max-h-[60vh] flex-col gap-6 overflow-y-auto pr-2 pb-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título do imóvel</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Ex: Apartamento 2 quartos Centro"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Descreva o imóvel..."
                                            className="min-h-[100px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço</FormLabel>
                                    <FormControl>
                                        <NumericFormat
                                            value={field.value}
                                            onValueChange={(values) => {
                                                field.onChange(values.floatValue ?? 0);
                                            }}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            decimalSeparator=","
                                            thousandSeparator="."
                                            prefix="R$ "
                                            allowNegative={false}
                                            placeholder="Digite o preço do imóvel"
                                            customInput={Input}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                                    <div className="space-y-0.5">
                                        <FormLabel>Ativo</FormLabel>
                                        <p className="text-sm text-muted-foreground">
                                            Imóveis inativos não aparecem nas buscas
                                        </p>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={upsertPropertyAction.status === "executing"}
                        >
                            {upsertPropertyAction.status === "executing" ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {entity ? "Salvar alterações" : "Adicionar imóvel"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};

export default UpsertPropertyForm;
