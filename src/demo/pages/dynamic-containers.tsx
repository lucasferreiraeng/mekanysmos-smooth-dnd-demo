import React, { useState } from 'react';
import { Container, Draggable, constants } from '@mekanysmos/react-smooth-dnd';
import { applyDrag, generateItems, DropResult } from './utils';

interface Item {
  id: string;
  data: string;
}

const DynamicContainers: React.FC = () => {
	const [items1, setItems1] = useState<Item[]>(generateItems(45, (i) => ({ id: '1' + i, data: `Draggable 1 - ${i}` })));
	const [items2, setItems2] = useState<Item[]>(generateItems(25, (i) => ({ id: '2' + i, data: `Draggable 2 - ${i}` })));
	const [items3, setItems3] = useState<Item[]>(generateItems(25, (i) => ({ id: '3' + i, data: `Draggable 3 - ${i}` })));
	const [items4, setItems4] = useState<Item[]>(generateItems(25, (i) => ({ id: '4' + i, data: `Draggable 4 - ${i}` })));
	const [popup1Open, setPopup1Open] = useState(false);
	const [popup2Open, setPopup2Open] = useState(false);

	const stateMap: Record<string, { get: () => Item[]; set: (items: Item[]) => void }> = {
		items1: { get: () => items1, set: setItems1 },
		items2: { get: () => items2, set: setItems2 },
		items3: { get: () => items3, set: setItems3 },
		items4: { get: () => items4, set: setItems4 },
	};

	const renderContainer = (listName: string, getList: () => Item[], autoScroll = true) => {
		return (
			<div className={`dynamic-container-holder`}>
				<Container autoScrollEnabled={autoScroll} getGhostParent={() => document.body} groupName="1" getChildPayload={i => getList()[i]} onDrop={(e: DropResult) => stateMap[listName].set(applyDrag(getList(), e))}>
					{
						getList().map(p => {
							return (
								<Draggable key={p.id}>
									<div className="draggable-item">
										{p.data}
									</div>
								</Draggable>
							);
						})
					}
				</Container>
			</div>
		);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'stretch', height: '100%' }}>
			<div className="dynamic-left-pane">
				{renderContainer('items1', () => items1)}
			</div>
			<div className="dynamic-right-pane">
				<div className="dynamic-menu-container">
					<div className="popup-container-button"
						onMouseEnter={() => setPopup1Open(true)}
						onMouseLeave={() => setPopup1Open(false)}
					>
						Make Container Visible
						<div className={`popup-container ${popup1Open ? 'open' : ''}  ${(constants as any).preventAutoScrollClass}`}>
							{renderContainer('items2', () => items2)}
						</div>
					</div>
					<div className="popup-container-button"
						onMouseEnter={() => setPopup2Open(true)}
						onMouseLeave={() => setPopup2Open(false)}
					>
						Mount New Container
						{popup2Open ? <div className={`popup-container ${popup2Open ? 'open' : ''}`}>
							{renderContainer('items3', () => items3)}
						</div> : null}
					</div>
				</div>
				<div className="dynamic-right-content">
					{renderContainer('items4', () => items4)}
				</div>
			</div>
		</div>
	);
};

export default DynamicContainers;
