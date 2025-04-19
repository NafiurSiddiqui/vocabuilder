import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";

interface InventoryCardProps {
    title: string;
    wordCount: number;
    showCheckbox?: boolean;
    checked?: boolean;
    onCheck?: (checked: boolean) => void;
    onAdd?: () => void;
}

export function InventoryCard({
    title,
    wordCount,
    showCheckbox = false,
    checked = false,
    onCheck,
    onAdd,
}: InventoryCardProps) {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between gap-0">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={onAdd}
                >
                    <Plus className="size-4" />
                    Add a word
                </Button>
                {/* <Checkbox checked={checked} onCheckedChange={onCheck} /> */}
                <Checkbox />
            </CardHeader>


            <CardContent>
                <Link href={route('inventory.show', title)}>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    {/* <span className="text-muted-foreground text-base font-medium"> */}
                    <CardDescription>
                        {wordCount} word{wordCount !== 1 ? "s" : ""}
                    </CardDescription>
                </Link>
                {/* </span> */}
            </CardContent>
        </Card >
    );
}