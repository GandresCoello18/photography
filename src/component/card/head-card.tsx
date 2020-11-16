import { Avatar, Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    Photo: any;
}

export function HeadCard({ Photo }: Props){
    const styles = {
        space: {
            paddingTop: 13, paddingBottom: 13
        },
        enlace: {
            textDecoration: 'none', color: '#000'
        }
    }

    return(
        <>
            <Row justify='space-around' style={styles.space}>
                <Col span={14}>
                    <Avatar style={{ border: 2, borderStyle: 'solid', borderColor: Photo.color }} src={Photo.user.profile_image.small} />
                    &nbsp; &nbsp;
                    <Link to={`/profile/${Photo.user.id}`} style={styles.enlace}>
                        <strong>{Photo.user.username}</strong>
                    </Link>
                </Col>
                <Col span={8}>
                    <span style={{ color: '#696969' }}>{moment(Photo.created_at).format('LLL')}</span>
                </Col>
            </Row>
        </>
    );
}
