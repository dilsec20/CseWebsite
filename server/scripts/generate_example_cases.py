import random
import os

# PROBLEM: Given N, followed by an array of N integers, print the SUM.

def solve(arr):
    return sum(arr)

def generate_random_test_case(case_num, input_dir, output_dir):
    # 1. Generate Random Input
    N = random.randint(1, 100) # Random size between 1 and 100
    arr = [random.randint(-1000, 1000) for _ in range(N)] # Random elements
    
    input_str = f"{N}\n" + " ".join(map(str, arr))
    
    # 2. Compute Expected Output
    expected_output = str(solve(arr))
    
    # 3. Save to Files
    input_filename = os.path.join(input_dir, f"{case_num}.in")
    output_filename = os.path.join(output_dir, f"{case_num}.out")
    
    with open(input_filename, 'w') as f:
        f.write(input_str)
        
    with open(output_filename, 'w') as f:
        f.write(expected_output)
        
    print(f"Generated Case {case_num}: N={N}")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    INPUT_DIR = os.path.join(current_dir, "raw_tests", "inputs") 
    OUTPUT_DIR = os.path.join(current_dir, "raw_tests", "outputs")

    if not os.path.exists(INPUT_DIR): os.makedirs(INPUT_DIR)
    if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR)

    # Generate 10 random test cases
    for i in range(1, 11):
        generate_random_test_case(i, INPUT_DIR, OUTPUT_DIR)
        
    print("\n✅ Generation Complete! Now run 'convert_tests_to_json.py' to package them.")
