import { Popover, PopoverContent, Button, PopoverTrigger, Divider } from "@nextui-org/react";
import { FC, ReactElement, useState } from "react";
import { CancelIcon, TrashIcon } from "./icons";
import { useTranslations } from "next-intl";

export interface ConfirmPopoverProps {
  confirmIcon: ReactElement;
  trigger: ReactElement;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmPopover: FC<ConfirmPopoverProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("confirmPopover");

  const handleConfirm = (event: MouseEvent) => {
    event.preventDefault();
    props.onConfirm();
  };
  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    setIsOpen(false);

    if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} showArrow offset={10}>
      <PopoverTrigger>{props.trigger}</PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              {t("sure")}
            </p>
            <Divider className="my-2" />
            <div className="py-2 flex">
              <Button color="warning" size="sm" onClick={(e) => handleConfirm(e.nativeEvent)}>
                {props.confirmIcon}
                {t("confirm")}
              </Button>
              <Button size="sm" onClick={(e) => handleCancel(e.nativeEvent)}>
                <CancelIcon />
                {t("cancel")}
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
      <span></span>
    </Popover>
  );
};
