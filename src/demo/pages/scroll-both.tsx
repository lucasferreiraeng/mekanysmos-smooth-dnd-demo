import React, { useState } from 'react';
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';
import { applyDrag, generateItems, DropResult } from './utils';

const groupStyle: React.CSSProperties = {
	marginLeft: '50px',
	flex: 1
};

interface Item {
  id: string;
  data: string;
}

const ScrollBoth: React.FC = () => {
	const [items1, setItems1] = useState<Item[]>(generateItems(45, (i) => ({ id: '1' + i, data: `Source Draggable - ${i}` })));
	const [items2, setItems2] = useState<Item[]>(generateItems(45, (i) => ({ id: '2' + i, data: `Draggable 2 - ${i}` })));
	const [items3, setItems3] = useState<Item[]>(generateItems(45, (i) => ({ id: '3' + i, data: `Draggable 3 - ${i}` })));

	return (
		<div style={{ height: '600px', width: '600px', overflow: 'auto' }}>
			<div style={{ display: 'flex', justifyContent: 'stretch', marginTop: '50px', marginRight: '50px', height: '1000px', width: '1000px', overflow: 'auto' }}>
				<div style={groupStyle}>
					<Container groupName="1" behaviour="copy" getChildPayload={i => items1[i]} onDrop={(e: DropResult) => setItems1(applyDrag(items1, e))}>
						{
							items1.map((p, i) => {
								return (
									<Draggable key={i}>
										<div className="draggable-item">
											{p.data}
										</div>
									</Draggable>
								);
							})
						}
					</Container>
				</div>
				<div style={groupStyle}>
					<Container groupName="1" getChildPayload={i => items2[i]} onDrop={(e: DropResult) => setItems2(applyDrag(items2, e))}>
						{
							items2.map((p, i) => {
								return (
									<Draggable key={i}>
										<div className="draggable-item">
											{p.data}
										</div>
									</Draggable>
								);
							})
						}
					</Container>
				</div>
				<div style={groupStyle}>
					<Container groupName="1" getChildPayload={i => items3[i]} onDrop={(e: DropResult) => setItems3(applyDrag(items3, e))}>
						{
							items3.map(p => {
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
			</div>
		</div>
	);
};

export default ScrollBoth;
