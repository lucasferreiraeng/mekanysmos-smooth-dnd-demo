import React, { useState } from 'react';
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';
import { DropResult } from './utils';

const DropZone: React.FC = () => {
	const [zones, setZones] = useState<number[]>([1, 0, 0, 0]);
	const [classes, setClasses] = useState<string[]>(['', '', '', '']);

	const onDrop = (containerIndex: number, dropresult: DropResult) => {
		const { addedIndex, removedIndex } = dropresult;
		if (addedIndex !== null || removedIndex !== null) {
			const newZones = [...zones];
			if (removedIndex !== null) {
				newZones[containerIndex] = 0;
			}
			if (addedIndex !== null) {
				newZones[containerIndex] = 1;
			}
			setZones(newZones);
		}

		const newClasses = [...classes];
		newClasses[containerIndex] = '';
		setClasses(newClasses);
	};

	const dragEnter = (i: number) => {
		const newClasses = [...classes];
		newClasses[i] = 'hover';
		setClasses(newClasses);
	};

	const dragLeave = (i: number) => {
		const newClasses = [...classes];
		newClasses[i] = '';
		setClasses(newClasses);
	};

	return (
		<div className="drop-zone">
			{zones.map((p, i) => {
				return (
					<div className={`drop-zone-container ${classes[i]}`} key={i}>
						<Container
							style={{ height: '100%' }}
							groupName="1"
							behaviour="drop-zone"
							onDrop={e => onDrop(i, e)}
							onDragEnter={() => dragEnter(i)}
							onDragLeave={() => dragLeave(i)}>
							{p ? (
								<Draggable>
									<div className="drop-zone-draggable">
										Draggable
								</div>
								</Draggable>
							) : null}
						</Container>
					</div>
				);
			})}
		</div>
	);
};

export default DropZone;
