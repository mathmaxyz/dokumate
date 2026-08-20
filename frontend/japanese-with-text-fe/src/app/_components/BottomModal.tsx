import "../_styles/bottomModal.css"

export interface FloatingContainerProps {
	onClose: () => void;
	children: React.ReactNode;
	getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
	setFloating: (node: HTMLElement | null) => void;
}

export default function BottomModal({ onClose, children, getFloatingProps, setFloating }: FloatingContainerProps) {
	return (
		<div className="bottom-modal-backdrop">
			<div {...getFloatingProps()} ref={setFloating} className="bottom-modal-container">
				<button className="close-word-menu" onClick={onClose}>x</button>
				<div className="bottom-modal-content">
					{children}
				</div>
			</div>
		</div>
	);
}
