import React, { FC } from "react";
import {Button, ButtonGroup, Card} from "@/components/ui";

const MobileMenu: FC = () => {
    return (
            <ButtonGroup aria-label="Button group">
                <Button variant="outline">Button 1</Button>
                <Button variant="outline">Button 2</Button>
            </ButtonGroup>
    );
};

export default MobileMenu;