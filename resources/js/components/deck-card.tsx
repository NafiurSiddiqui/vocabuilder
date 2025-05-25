import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';

interface DeckCardProps {
    title: string;
    slug: string;
    wordCount: number;
    isDefaultDeck?: boolean;
    showCheckbox?: boolean;
    checked?: boolean;
    onCheck?: (checked: boolean) => void;
    onAdd?: () => void;
}

export function DeckCard({ title, slug, wordCount, isDefaultDeck = false, showCheckbox = false, checked = false, onCheck, onAdd }: DeckCardProps) {
    const url = isDefaultDeck ? route('inventory.default.show', slug) : route('inventory.show', slug);

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between gap-0">
                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={onAdd}>
                    <Plus className="size-4" />
                    Add a word
                </Button>
                {/* <Checkbox checked={checked} onCheckedChange={onCheck} /> */}
                {showCheckbox && <Checkbox />}
            </CardHeader>

            <CardContent>
                <Link href={url}>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    {/* <span className="text-muted-foreground text-base font-medium"> */}
                    <CardDescription>
                        {wordCount} word{wordCount !== 1 ? 's' : ''}
                    </CardDescription>
                </Link>
                {/* </span> */}
            </CardContent>
        </Card>
    );
}
