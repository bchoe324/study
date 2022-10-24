
public class Casting {

	public static void main(String[] args) {
		
		double a = 1.1;
		
		double b = 1;
		// double b2 = (double) 1; 과 같다. 손실이 없기 때문에 자동으로 바꿔준 
		
		System.out.println(b);
		
		// int c = 1.1;
		double d = 1.1; // change type
		int e = (int) 1.1; // add cast
		
		System.out.println(e); // 1
		// 1.1 -> 1이 됨 이를 '손실'이라고 
		
		
		// 1(Number) to String
		String f = Integer.toString(1) ;
		System.out.println(f.getClass()); // 데이터 타입을 알려
	}

}
