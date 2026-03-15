import React, { useRef, useState, useEffect } from 'react';
import container from 'smooth-dnd';

const Vanilla: React.FC = () => {
	const [items] = useState<number[]>(Array(50).fill(undefined).map((_p, i) => i));
	const containerRef = useRef<HTMLDivElement | null>(null);
	const container2Ref = useRef<HTMLDivElement | null>(null);
	const container3Ref = useRef<HTMLDivElement | null>(null);
	const container4Ref = useRef<HTMLDivElement | null>(null);

	const dragStyle: React.CSSProperties = {
		height: '50px',
		textAlign: 'center',
		border: '1px solid #ccc',
		verticalAlign: 'middle',
		lineHeight: '50px',
		backgroundColor: 'white',
		marginTop: '0px'
	};

	useEffect(() => {
		if (containerRef.current) {
			(window as any).container = container(containerRef.current, { groupName: '1', behaviour: 'copy' });
		}
		if (container2Ref.current) {
			(window as any).container2 = container(container2Ref.current, { groupName: '1', dragHandleSelector: '.handle' });
		}
		if (container3Ref.current) {
			(window as any).container3 = container(container3Ref.current, { groupName: '1', dragBeginDelay: 50, animationDuration: 300, dragClass: 'ghost' });
		}
		if (container4Ref.current) {
			(window as any).container4 = container(container4Ref.current, { orientation: 'horizontal' });
		}
	}, []);

	const childs = items.map(p => (
		<div style={Object.assign({}, dragStyle, { height: `${50 + (Math.random() * 200)}px` })} key={p}>Draggable {p}</div>
	));

	const horizontalChild = items.slice(0, 10).map(p => (
		<div style={Object.assign({}, dragStyle, { height: '100px', width: '150px' })} key={p}>Draggable {p}</div>
	));

	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div style={{ float: 'none', width: '510px', transform: 'scale3d(1,1,1)', backgroundColor: '#ccc', margin: '50px', border: '1px solid #ccc' }}>
					<div style={{ float: 'none', position: 'relative', height: '800px', overflowY: 'auto' }} ref={containerRef}>
						{childs}
					</div>
				</div>
				<div style={{ width: '510px', height: '800px', overflowY: 'auto', transform: 'scale3d(1,1,1)', backgroundColor: '#ccc', margin: '50px', border: '1px solid #ccc' }}>
					<div tabIndex={-1} id="a" style={{ float: 'none', position: 'relative' }} ref={container2Ref}>
						{items.map(p => (
							<div style={Object.assign({}, dragStyle, { margin: '2px 50px', backgroundColor: '#abc', height: `${50 + (Math.random() * 0)}px` })} key={p}>
								<div className="handle" style={{ float: 'left', width: '30px', height: '30px', backgroundColor: '#345' }}></div>
								Draggable {p}
							</div>
						))}
					</div>
				</div>
				<div style={{ float: 'none', width: '510px', height: '800px', overflowY: 'auto', transform: 'scale3d(1,1,1)', backgroundColor: '#ccc', margin: '50px', border: '1px solid #ccc' }}>
					<div style={{ float: 'none', position: 'relative', paddingBottom: '100px' }} ref={container3Ref}>
						{items.map(p => (
							<div style={Object.assign({}, dragStyle, { height: `${50 + (Math.random() * 0)}px` })} key={p}>Draggable {p}</div>
						))}
					</div>
				</div>
			</div>

			<div style={{ overflowX: 'auto', backgroundColor: '#ccc', border: '1px solid #ccc', margin: '100px' }}>
				<div ref={container4Ref}>
					{horizontalChild}
				</div>
			</div>


			{/* <div style={{ position: 'fixed', top: '100px', left: '100px', bottom: '100px', width: '300px', overflowY: 'auto', backgroundColor: '#ccc', border: '1px solid #ccc' }}>
				<div style={{ float: 'none', position: 'relative' }} ref={containerRef}>
					{childs}
				</div>
			</div>
			<div style={{ marginLeft: '500px', width: '400px', paddingBottom: '200px', height: '800px', overflow: 'auto' }} ref={container3Ref}>
				{items.map(p => (
					<div style={Object.assign({}, dragStyle, { margin: '1px', height: `${50 + (Math.random() * 0)}px` })} key={p}>Draggable {p}</div>
				))}
			</div> */}
		</div>
	);
};

export default Vanilla;
