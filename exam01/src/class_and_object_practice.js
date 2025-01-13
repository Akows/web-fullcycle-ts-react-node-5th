// 클래스 정의
class Person {
    // 생성자 함수 (constructor)
    // 객체 생성 시 초기값을 설정하기 위해 호출됨
    constructor(name, age) {
        this.name = name; // this는 생성된 객체를 참조
        this.age = age;
    }

    // 메서드 정의
    // 객체에 포함된 동작(함수)을 정의
    greet() {
        console.log(`안녕하세요! 제 이름은 ${this.name}이고, 나이는 ${this.age}살입니다.`);
    }

    // 정적 메서드 (Static Method)
    // 특정 객체가 아닌 클래스 자체에서 호출 가능
    static species() {
        console.log("나는 인간입니다.");
    }
}

// 클래스 사용 (객체 생성)
const person1 = new Person("홍길동", 25); // Person 클래스의 인스턴스 생성
person1.greet(); // "안녕하세요! 제 이름은 홍길동이고, 나이는 25살입니다."

const person2 = new Person("이몽룡", 30);
person2.greet(); // "안녕하세요! 제 이름은 이몽룡이고, 나이는 30살입니다."

// 정적 메서드 호출 (인스턴스가 아닌 클래스에서 호출)
Person.species(); // "나는 인간입니다."

// 객체 속성 접근 및 수정
console.log(person1.name); // "홍길동"
person1.name = "임꺽정"; // 객체의 속성 수정
console.log(person1.name); // "임꺽정"

// -------------------------------------------------

// 객체 리터럴로 객체 생성
const car = {
    brand: "Hyundai",
    model: "Sonata",
    year: 2022,

    // 메서드 정의
    start() {
        console.log(`${this.brand} ${this.model}가 시동을 걸었습니다.`);
    },

    stop() {
        console.log(`${this.brand} ${this.model}가 멈췄습니다.`);
    },
};

// 객체 사용
console.log(car.brand); // "Hyundai"
car.start(); // "Hyundai Sonata가 시동을 걸었습니다."
car.stop(); // "Hyundai Sonata가 멈췄습니다."

// -------------------------------------------------

// 생성자 함수로 객체 생성 (클래스 이전 방식)
function Animal(type, sound) {
    this.type = type; // 속성 정의
    this.sound = sound;
}

// 프로토타입 메서드 추가
Animal.prototype.makeSound = function () {
    console.log(`${this.type}가(이) '${this.sound}' 소리를 냅니다.`);
};

// 생성자 함수로 객체 생성
const dog = new Animal("개", "멍멍");
dog.makeSound(); // "개가(이) '멍멍' 소리를 냅니다."

const cat = new Animal("고양이", "야옹");
cat.makeSound(); // "고양이가(이) '야옹' 소리를 냅니다."

// -------------------------------------------------

// ES6 클래스와 객체 리터럴 비교
class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }

    study() {
        console.log(`${this.name}는 ${this.grade}학년입니다.`);
    }
}

const student1 = new Student("지민", 3);
student1.study(); // "지민는 3학년입니다."

// 객체 리터럴
const student2 = {
    name: "수현",
    grade: 2,
    study() {
        console.log(`${this.name}는 ${this.grade}학년입니다.`);
    },
};

student2.study(); // "수현는 2학년입니다."








// 클래스에서 getter와 setter 사용
class Rectangle {
    constructor(width, height) {
        this._width = width; // 내부 속성(_ 사용)
        this._height = height;
    }

    // getter: 속성 값을 읽을 때 사용
    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    // setter: 속성 값을 설정할 때 사용
    set width(value) {
        if (value > 0) {
            this._width = value;
        } else {
            console.error("Width must be greater than 0");
        }
    }

    set height(value) {
        if (value > 0) {
            this._height = value;
        } else {
            console.error("Height must be greater than 0");
        }
    }

    // 메서드: 면적 계산
    get area() {
        return this._width * this._height;
    }
}

// 객체 생성
const rect = new Rectangle(10, 5);
console.log(`Width: ${rect.width}`); // 10 (getter 호출)
console.log(`Height: ${rect.height}`); // 5 (getter 호출)
console.log(`Area: ${rect.area}`); // 50 (getter 호출)

// setter를 사용해 값 변경
rect.width = 20; // setter 호출
rect.height = 10; // setter 호출

console.log(`Updated Width: ${rect.width}`); // 20
console.log(`Updated Height: ${rect.height}`); // 10
console.log(`Updated Area: ${rect.area}`); // 200

// 잘못된 값 설정 (유효성 검사)
rect.width = -5; // "Width must be greater than 0"
rect.height = -10; // "Height must be greater than 0"

// ---------------------------------------------

// 객체 리터럴에서 getter와 setter 사용
const person = {
    _firstName: "홍길동",
    _lastName: "김",

    // getter: 전체 이름 반환
    get fullName() {
        return `${this._lastName} ${this._firstName}`;
    },

    // setter: 성과 이름을 변경
    set fullName(name) {
        const parts = name.split(" ");
        if (parts.length === 2) {
            this._lastName = parts[0];
            this._firstName = parts[1];
        } else {
            console.error("Please provide both a last name and a first name.");
        }
    },
};

// getter 호출
console.log(person.fullName); // "김 홍길동"

// setter 호출
person.fullName = "이 몽룡";
console.log(person.fullName); // "이 몽룡"

// 잘못된 값 설정
person.fullName = "이몽룡"; // "Please provide both a last name and a first name."
