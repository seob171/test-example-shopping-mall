import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

beforeEach(async () => {
  await render(<TextField className={'my-class'} />);
});

it('className prop으로 설정한 css class가 적용된다.', async () => {
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  screen.debug();

  expect(textInput).toHaveClass('my-class');
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    screen.debug();

    expect(textInput).toBeInTheDocument();
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder={'상품명을 입력해 주세요.'} />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    screen.debug();

    expect(textInput).toBeInTheDocument();
  });

  it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn();

    const { user } = await render(
      <TextField placeholder={'상품명을 입력해 주세요.'} onChange={spy} />,
    );

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    screen.debug();

    await user.type(textInput, 'test');

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn();

    const { user } = await render(
      <TextField placeholder={'상품명을 입력해 주세요.'} onEnter={spy} />,
    );

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    screen.debug();

    await user.type(textInput, 'test{Enter}');

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('focus 시 onFocus 핸들러 호출', async () => {
    const spy = vi.fn();

    const { user } = await render(
      <TextField placeholder={'상품명을 입력해 주세요.'} onFocus={spy} />,
    );

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    screen.debug();

    await user.click(textInput);

    expect(spy).toHaveBeenCalled();
  });

  it('focus 활성화시 border 스타일이 추가된다.', async () => {
    const { user } = await render(
      <TextField placeholder={'상품명을 입력해 주세요.'} />,
    );

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    screen.debug();

    await user.click(textInput);

    expect(textInput).toHaveStyle({
      borderWidth: '2px',
      borderColor: 'rgb(25, 118, 210)',
    });
  });
});
