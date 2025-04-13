import { Input } from "./input";
import { Button } from "./button";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { useState } from "react";

export function SearchBar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <div className="flex grow-0 w-96 items-center gap-2 border rounded-md p-1">
                <Search size={16} />
                <input placeholder="Search..." className="text-sm focus:outline-none focus:ring-0 border-none shadow-none" type="search" onClick={() => setIsSearchOpen(true)} />
            </div>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Input placeholder="Search..." className="flex-1" />
                        <Button variant="outline" onClick={() => setIsSearchOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Recent searches</h3>
                        <div className="space-y-1">
                            {/* Dummy search results */}
                            {['apple', 'banana', 'orange', 'grape'].map((item) => (
                                <div key={item} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                                    <span className="text-sm">{item}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
