import React from "react";
import PieChart from 'react-minimal-pie-chart';

export const MoonChart = () => {

    return (
        <section className="moon">
            <h3 className="title">Public</h3>
            <PieChart
                animate={false}
                animationDuration={500}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={[
                    {
                        color: '#E38627',
                        title: 'One',
                        value: 10
                    },
                    {
                        color: '#C13C37',
                        title: 'Two',
                        value: 15
                    },
                    {
                        color: '#6A2135',
                        title: 'Three',
                        value: 20
                    }
                ]}
                label
                labelPosition={60}
                labelStyle={{
                    fontFamily: 'sans-serif',
                    fontSize: '5px'
                }}
                lengthAngle={360}
                lineWidth={20}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={18}
                radius={50}
                ratio={1}
                rounded
                startAngle={0}
            />
            <div className="titles">
                <h3>Global</h3>
                <h3>Local</h3>
            </div>
        </section>
    )
};
