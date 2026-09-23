export interface IDeliveryConfirmFormProps {
	orderId: string;
	onConfirmed: () => void;
}

export interface IUseDeliveryConfirmFormControllerParams {
	orderId: string;
	onConfirmed: () => void;
}
