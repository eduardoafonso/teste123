import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

interface Item {
    id: number;
    name: string;
}

const DragAndDropTable: React.FC = () => {
    const [items, setItems] = useState<Item[]>([
        { id: 1, name: 'Pelotas' },
        { id: 2, name: 'Caxias do Sul' },
        { id: 3, name: 'São Leopoldo' },
        { id: 4, name: 'Balneário Camboriu' },
    ]);

    const [draggedItemId, setDraggedItemId] = useState<number | null>(null);

    const handleDragStart = (id: number, event: React.DragEvent<HTMLTableRowElement>) => {
        setDraggedItemId(id);
        event.currentTarget.classList.add('dragging');
    };

    const handleDragEnd = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.currentTarget.classList.remove('dragging');
    };

    const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLTableRowElement>, id: number) => {
        event.preventDefault();
        if (draggedItemId === null) return;

        const draggedIndex = items.findIndex(item => item.id === draggedItemId);
        const targetIndex = items.findIndex(item => item.id === id);

        const newItems = [...items];
        const [removed] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, removed);

        setItems(newItems);
        setDraggedItemId(null);
    };

    return (
        <div>
            <Button
                onClick={() => {
                    const newItem: Item = {
                        id: items.length + 1,
                        name: `Item ${items.length + 1}`
                    };
                    setItems([...items, newItem]);
                }}
                variant="primary"
                className="mb-3"
            >
                Add Item
            </Button>
            <Button onClick={() => {
                items.forEach((obj: Item) => { alert(obj.name) })
            }}>
                Salvar
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr
                            key={item.id}
                            draggable
                            onDragStart={(event) => handleDragStart(item.id, event)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={(event) => handleDrop(event, item.id)}
                        >
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DragAndDropTable;
