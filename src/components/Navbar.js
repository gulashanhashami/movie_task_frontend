import styled from "styled-components";

const Stylediv = styled.div`
font-family:   Arial, sans-serif;
   .nav{
       width: 100%;
       height: 8vh;
       color: white;
       display: flex;
       flex-direction: row;
       justify-content: space-between;
       align-items: center;
         padding-left:7%;
       background-color: red;
   }
`;
export const Navbar = () => {

// Navbar UI
    return (
        <div>
            <Stylediv>
                <div className="nav">
                    <h2>Movies</h2>
                </div>
            </Stylediv>
        </div>
    )
}