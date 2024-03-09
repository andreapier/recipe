import { Button, ButtonGroup, Input, InputProps } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "./icons";

export interface AddRemoveInputProps extends InputProps {
  removeDisabled?: boolean;
  removeHidden?: boolean;
  onAdd: () => void;
  onRemove?: () => void;
}

export const AddRemoveInput = ({ removeDisabled = false, removeHidden = false, onAdd, onRemove, ...props }: AddRemoveInputProps) => (
  <Input
    aria-label="add-remove-input"
    endContent={
      <ButtonGroup>
        <Button isIconOnly aria-label="add" variant="light" size={props.size} onClick={onAdd}>
          <PlusIcon />
        </Button>
        {!removeHidden && (
          <Button isIconOnly aria-label="remove" color="warning" isDisabled={removeDisabled} variant="light" size={props.size} onClick={onRemove}>
            <TrashIcon />
          </Button>
        )}
      </ButtonGroup>
    }
    size={props.size}
    {...props}
  />
);
