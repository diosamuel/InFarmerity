export default function Gauge({ value, min = 0, max = 100, type = "%", left="Normal", right="Error"}) {
    const maxSensorValue = max;
    const minSensorValue = min;
    let sensorValue = Math.min(Math.max(value, minSensorValue), maxSensorValue);
    const percentage = (sensorValue - minSensorValue) / (maxSensorValue - minSensorValue) * 100;
    let deg = -45 + (percentage / 100) * 180;

    return (
        <>
            <div className="relative flex aspect-[2] items-center justify-center overflow-hidden rounded-t-full">
                {/* Outer ring with ranges (rotate angles modifiable to get custom range) */}
                {/* <div className="absolute top-0 aspect-square w-full rounded-full rotate-[-45deg] bg-gradient-to-tr from-transparent from-50% to-red-500 to-50% transition-transform duration-500"></div>
            <div className="absolute top-0 aspect-square w-full rounded-full rotate-[0deg] bg-gradient-to-tr from-transparent from-50% to-orange-400 to-50% transition-transform duration-500"></div>
            <div className="absolute top-0 aspect-square w-full rounded-full rotate-[15deg] bg-gradient-to-tr from-transparent from-50% to-green-600 to-50% transition-transform duration-500"></div>
            <div className="absolute top-0 aspect-square w-full rounded-full rotate-[95deg] bg-gradient-to-tr from-transparent from-50% to-orange-400 to-50% transition-transform duration-500"></div>
            <div className="absolute top-0 aspect-square w-full rounded-full rotate-[100deg] bg-gradient-to-tr from-transparent from-50% to-red-500 to-50% transition-transform duration-500"></div> */}
                {/* Optional black separation if the gauge has the same color as the outer ring */}
                <div className="absolute top-7 flex aspect-square justify-center rounded-full w-[93%]"></div>
                {/* Actual gauge, change angle again for a dynamic value */}
                <div className="absolute top-8 flex aspect-square w-11/12 justify-center rounded-full bg-green-600"></div>
                <div className={`absolute top-8 aspect-square w-11/12 rounded-full bg-gradient-to-tr from-transparent from-50% to-blue-100 to-50% transition-transform duration-500`} style={{ transform: `rotate(${deg}deg)` }}></div>
                <div className="absolute top-1/3 flex aspect-square w-3/4 justify-center rounded-full bg-white "></div>
                <div className="absolute bottom-2 w-full truncate text-center text-2xl leading-none">{value}{type}</div>
            </div>
            <div className="w-full flex justify-between">
                <p color={"black"}>{left}</p>
                <p color={"black"}>{right}</p>
            </div>
        </>
    );
}
