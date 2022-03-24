import styled from "@emotion/styled";

export const Formulario = styled.form`
    max-width: 60rem;
    width: 95%;
    margin: 5rem auto;
    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        padding: 2rem;
    }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    label {
        flex: 0 0 15rem;
        font-size: 1.8rem;
    }
    input,
    textarea {
        flex: 1;
        padding: 1rem;
    }
    textarea {
        height: 20rem;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    color: #fff;
    border: none;
    text-transform: uppercase;
    padding: 1.5rem;
    width: 100%;
    margin-top: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }    
`;

export const Error= styled.p`
    background-color: red;
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`;