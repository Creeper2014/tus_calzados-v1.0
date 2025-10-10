import { useForm } from "react-hook-form";
import { InputAddress } from "./InputAddress"
import { ItemsCheckout } from "./ItemsCheckout";
import { addressSchema, type AddressFormValues } from "../../lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrder } from "../../hooks";
import { useCartStore } from "../../store/cart.store";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";

// CONST DE ENVIOS PRECIOS
	const shippingOptions = [
		{ id: "free", label: "Envío gratis - Estándar", price: 0, minAmount: 50000 },
		{ id: "home", label: "Envío a domicilio", price: 10000 },
		{ id: "pickup", label: "Retiro en sucursal", price: 8000 },
	];

// CONST DE ENVIOS PRECIOS

export const FormCheckout = () => {

    const {
        register,
		formState: { errors },
		handleSubmit,
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
    });


    const { mutate: createOrder, isPending } = useCreateOrder();

	//aceptar terminos
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	//aceptar terminos

	const cleanCart = useCartStore(state => state.cleanCart);
	const cartItems = useCartStore(state => state.items);
	const totalAmount = useCartStore(state => state.totalAmount);
	

	//CONST SELECT ENVIOS
	const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
	//CONST SELECT ENVIOS


	const validOptions = shippingOptions.filter(
		(opt) => !opt.minAmount || totalAmount >= opt.minAmount
	);
	//CONST SELECT ENVIOS

	// 🔹 obtener el precio del método seleccionado
	const selectedOption = validOptions.find((opt) => opt.id === selectedShipping);
	const shippingPrice = selectedOption?.price ?? 0;

	// 🔹 total final = carrito + envío
	const finalAmount = totalAmount + shippingPrice;

    const onSubmit = handleSubmit(data => {
		const orderInput = {
			address: data,
				cartItems: cartItems.map(item => ({
				variantId: item.variantId,
				quantity: item.quantity,
				price: item.price,
			})),
			subtotal: totalAmount,
			shippingMethod: selectedShipping, // 🔹 guardás el método de envío elegido
			shippingPrice,       // lo guardás por separado
      		totalAmount: finalAmount, // total con envío
		};

		createOrder(orderInput, {
			onSuccess: () => {
				cleanCart();
			},
		});
	});

    if (isPending) {
		return (
			<div className='flex flex-col gap-3 h-screen items-center justify-center'>
				<ImSpinner2 className='animate-spin h-10 w-10' />

				<p className='text-sm font-medium'>
					Estamos procesando tu pedido
				</p>
			</div>
		);
	}
    

    return (
        <div>
            <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="flex flex-col gap-3">
                    <h3 className=" text-lg font-semibold tracking-normal">
                        Entrega
                    </h3>

                    <InputAddress 
                        register={register}
                        errors={errors}
                        name="addressLine1"
                        placeholder="Dirección Principal"
                    />

                    <InputAddress 
                        register={register}
                        errors={errors}
                        name="addressLine2"
                        placeholder="Dirección Adicional (Opcional)"
                    />

                    <InputAddress 
                        register={register}
                        errors={errors}
                        name="state"
                        placeholder="Provincia / Estado"
                    />

                    <InputAddress 
                        register={register}
                        errors={errors}
                        name="city"
                        placeholder="Ciudad"
                    />

                    <InputAddress 
                        register={register}
                        errors={errors}
                        name="postalCode"
                        placeholder="Codigo Postal (Obligatorio)"
                    />

                    <select className="border border-slate-200 rounded-md p-3"
                        {...register("country")}
                    >
                        <option value="Argentina">Argentina</option>
                    </select>
                </div>

                <div className="flex flex-col gap-3">
					<p className="text-sm font-medium">Métodos de envío</p>

					{validOptions.map((opt) => (
					<div
						key={opt.id}
						onClick={() => setSelectedShipping(opt.id)}
						className={`flex justify-between items-center text-sm border cursor-pointer py-4 px-6 rounded-md transition 
						${
							selectedShipping === opt.id
							? "bg-gray-300 border-slate-800"
							: "bg-stone-100 border-slate-400 hover:bg-gray-200"
						}`}
					>
						<span className="font-normal">{opt.label}</span>
						<span className="font-semibold">
						{opt.price > 0 ? `$${opt.price.toLocaleString()}` : "Gratis"}
						</span>
					</div>
					))}
				</div>

            	<div className='flex flex-col'>
					<div className='flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-ss-md rounded-se-md px-6'>
						<span>Depósito Bancario</span>
					</div>

					<div className='bg-stone-100 text-[13px] p-5 space-y-0.5 border border-gray-200 rounded-es-md rounded-ee-md'>
						<p>Compra a traves de transferencia bancaria</p>
						<p>Banco Hipotecario</p>
						<p>Alias de CBU: TUS.CALZADOS</p>
						<p>Numero de CBU: 0440006640000370384232</p>
						<p>Número de cuenta: 400600037038423</p>
						<p>Titular de la cuenta: Jose Ezequiel Romero</p>
						<p>Cuit: 20442103330</p>
						<p>
							La información será compartida nuevamente una vez que se haya finalizado la compra
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-6'>
					<h3 className='font-semibold text-3xl'>
						Resumen del pedido
					</h3>
					
					<ItemsCheckout selectedShipping={selectedOption}/>
					<div className="flex justify-between text-lg font-bold">
						<span>Total:</span>
						<span>${finalAmount.toLocaleString()}</span>
					</div>
				</div>


				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<input
						type="checkbox"
						id="terms"
						checked={acceptedTerms}
						onChange={(e) => setAcceptedTerms(e.target.checked)}
						className="w-4 h-4"
					/>
					<label htmlFor="terms" className="text-sm">
						He leído y acepto los{" "}
						<a href="/terminos" target="_blank" className="text-blue-600 underline">
							Términos y Condiciones
						</a>{" "}
							y la{" "}
						<a href="/privacidad" target="_blank" className="text-blue-600 underline">
							Política de Privacidad
						</a>.
						</label>
					</div>

					<button
						type='submit'
						className='bg-black text-white py-3.5 font-bold tracking-wide rounded-md mt-2 w-full disabled:opacity-50'
						disabled={!acceptedTerms || !selectedShipping} // obligatorio elegir envío}
					>
						Finalizar Pedido
					</button>
		
				</div>

            </form>
        </div>
    );
};