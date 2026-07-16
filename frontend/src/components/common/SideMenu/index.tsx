import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

interface SideMenuProps {
    // onInterestPostClick?: () => void;
    onNotInterestPostClick?: () => void;
}

export function SideMenu({ onNotInterestPostClick }: SideMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[100px] rounded-xl border-chat bg-white shadow-lg">
                <DropdownMenuGroup>
                    {/* <DropdownMenuItem className="text-xs cursor-pointer" onClick={onInterestPostClick}>
                        관심 게시물 등록
                    </DropdownMenuItem> */}
                    <DropdownMenuItem className="text-xs text-red cursor-pointer" onClick={onNotInterestPostClick}>
                        관심 없음
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
