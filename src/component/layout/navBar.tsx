import { HomeOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

export function NavBar(){
    const styles: any = {
        container: {
            alignItems: 'center',
            backgroundColor: '#fcfcfc',
            borderTop: 1,
            borderTopColor: '#e0e0e0',
            borderTopStyle: 'solid',
            bottom: 0,
            display: 'flex',
            height: 50,
            justifyContent: 'space-around',
            margin: 0,
            maxWidth: 770,
            position: 'fixed',
            width: '100%',
            zIndex: 1000,
        },
        item: {
            alignItems: 'center',
            color: '#888',
            display: 'inline-flex',
            height: '100%',
            justifyContent: 'center',
            textDecoration: 'none',
            width: '100%',
        },
        icon: {
            fontSize: 25, color: '#94acc4', fontWeight: 'bold', cursor: 'pointer'
        }
    }

    return(
        <>
        <br/>
            <Row style={styles.container}>
                <Col span={8} style={styles.item}>
                    <Link to='/'>
                        <HomeOutlined style={styles.icon} />
                    </Link>
                </Col>
                <Col span={8} style={styles.item}>
                    <Link to='/likes'>
                        <LikeOutlined style={styles.icon} />
                    </Link>
                </Col>
                <Col span={8} style={styles.item}>
                    <Link to='/me'>
                        <UserOutlined style={styles.icon} />
                    </Link>
                </Col>
            </Row>
        </>
    );
}
