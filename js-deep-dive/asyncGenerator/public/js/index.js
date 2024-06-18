// 제너레이터는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

// 1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
// 일반함수는 호출하면 제어권이 함수에게 넘어가고 함수 코드를 일괄 실행한다.
// 즉 함수호출자(caller)는 함수를 호출한 이후 함수 실행을 제어할 수 없다.
// 제너레이터는 함수 호출자에게 양도(yield)할 수 있다는 것을 의미.

// 2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
// 일반 함수는 매개변수를 통해 외부에서 값을 주입받고 함수 코드를 일괄 실행해 결과값을
// 함수 외부로 반환한다.
// 즉 함수가 실행되고 있는 동안에는 함수 외부에서 내부로 값을 전달하여 함수의 상태를 변경X
// 제너레이터 함수는 함수 호출자와 양방향으로 함수의 상태를 주고받을 수 있다.
// 다시 말해, 제너레이터 함수는 함수 호출자에게 상태를 전달할 수 있고, 함수 호출자로부터
// 상태를 전달받을 수도 있다.

// 3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 일반 함수를 호출하면 함수 코드를 일괄 실행하고 값을 반환한다.
// 제너레이터를 호출하면 함수 코드를 실행하는 것이 아닌,
// 이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환한다.