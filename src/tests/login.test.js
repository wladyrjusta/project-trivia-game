import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../Pages/Login';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Login', () => {
  it('Verifica se os componentes de input para nome e Email são renderizados corretamente', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByLabelText('NOME');
    const inputEmail = screen.getByLabelText('EMAIL');
    const playBtn = screen.getByRole('button', { name: /Play/i });

    expect(inputName).toBeVisible();
    expect(inputEmail).toBeVisible();
    expect(playBtn).toBeVisible();
  });

  it('Verifica se o botão é habilitado apenas quando digitado email e nome, se ao ser clicado salva nome e email no store e redireciona para path: /game', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const name = 'Usuário';
    const email = 'usuario@trivia.com'

    const inputName = screen.getByLabelText('NOME');
    const inputEmail = screen.getByLabelText('EMAIL');
    const playBtn = screen.getByRole('button', { name: /Play/i });

    expect(inputName).toHaveValue('');
    expect(inputEmail).toHaveValue('');
    expect(playBtn).toBeDisabled();

    userEvent.type(inputName, name);
    userEvent.type(inputEmail, email);
    expect(inputName).toHaveValue(name);
    expect(inputEmail).toHaveValue(email);
    expect(playBtn).toBeEnabled();
    userEvent.click(playBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/game');
    expect(store.getState().player.name).toBe(name);
    expect(store.getState().player.gravatarEmail).toBe(email);

    const headingGames = screen.getByRole('heading', { level: 1 });
    expect(headingGames).toBeVisible();
    
  });
  it('Verifica se o botão é configurações redireciona para a rota /settings ao ser clicado',  () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsBtn = screen.getByTestId('btn-settings');

    expect(settingsBtn).toBeVisible();
    expect(settingsBtn).toBeEnabled();
    userEvent.click(settingsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');

    const headingSettings = screen.getByTestId('settings-title');
    expect(headingSettings).toBeVisible();
    
  });
});