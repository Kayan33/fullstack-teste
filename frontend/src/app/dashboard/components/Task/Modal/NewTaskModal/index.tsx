'use client';

import { FormEvent, useState } from "react";
import styles from "../modal.module.css";
import { taskService } from "@/service/task-service";
import { toast } from "react-toastify";

interface NewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTaskCreated: () => void;
}

export function NewTaskModal({ isOpen, onClose, onTaskCreated }: NewTaskModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await taskService.register({ title, description });

            setTitle("");
            setDescription("");
            onTaskCreated();
            onClose();
            toast.success(response.data?.message);
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>Nova Tarefa</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Título</label>
                        <input
                            autoFocus
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: entregar até terça-feira desafio técnico"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Detalhes opcionais..."
                            rows={4}
                        />
                    </div>

                    <div className={styles.modalActions}>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting} className="btn">
                            {isSubmitting ? "Salvando..." : "Criar Tarefa"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}