package corner

import "fmt"

var number_int_32 int32

func Corner() {
	// 数字类型

	number1, number2, number3 := 1, 2, 3

	number_int_32 = 222 // number_int_32 和上面的默认值是一样的，这其中的

	fmt.Printf("test number from number1 = %v, number2 = %v, number3 = %v,number_int_32 = %v", number1, number2, number3, number_int_32)

}
