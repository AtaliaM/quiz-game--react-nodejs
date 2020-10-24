import React from 'react';

const Footer = () => {

    const style = {
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        height: "20px",
        backgroundColor:  "#D28D68",
        color: "#fffff",
        fontSize:"15px",
        textAlign: "center",
        paddingBottom: "10px",
        marginTop: "20px",
    }

    return (
        <footer style={style}>&copy; Created by Atalia Mucharsky <a href="https://github.com/AtaliaM" target="_blank" rel="noopener noreferrer" alt="github"><i className="fab fa-github"></i></a></footer>
    )


}

export default Footer;