import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

interface Props {
    isLoading: boolean;
    count: number;
}

export function CardsPlaceholder({ isLoading, count }: Props){
    const [Skeletons, setSkeletons] = useState<Array<number>>([]);

    useEffect( () => {
        for(let i = 0; i < count; i++){
            setSkeletons([i]);
        }
    }, [count]);

    return(
        <>
            {Skeletons.map(item => (
                <div style={{ padding: 10 }}>
                    <Skeleton loading={isLoading} active avatar key={item} />
                </div>
            ))}
        </>
    );
}
