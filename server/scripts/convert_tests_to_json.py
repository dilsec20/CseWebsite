import os
import json

def generate_json(input_dir, output_dir, output_json_file):
    test_cases = []
    
    # Get all .in or .txt files from input directory
    files = sorted([f for f in os.listdir(input_dir) if f.endswith('.in') or f.endswith('.txt')])
    
    print(f"Found {len(files)} input files...")

    for filename in files:
        # Determine matching output filename (e.g., 1.in -> 1.out)
        base_name = os.path.splitext(filename)[0]
        input_path = os.path.join(input_dir, filename)
        
        # Try finding the output file with .out or .ans extension
        output_path = os.path.join(output_dir, base_name + ".out")
        if not os.path.exists(output_path):
            output_path = os.path.join(output_dir, base_name + ".ans")
            
        if os.path.exists(input_path) and os.path.exists(output_path):
            with open(input_path, 'r') as f_in:
                input_content = f_in.read().strip()
            
            with open(output_path, 'r') as f_out:
                output_content = f_out.read().strip()
            
            # Default to hidden/submit test cases. 
            # You can manually change 'is_sample' to True for the first few after generating.
            test_cases.append({
                "input": input_content,
                "expected_output": output_content,
                "is_sample": False 
            })
            print(f"Processed {filename}")
        else:
            print(f"Skipping {filename}: Output file not found (expected {base_name}.out or {base_name}.ans)")

    # Write to JSON file
    with open(output_json_file, 'w') as f:
        json.dump(test_cases, f, indent=2)
    
    print(f"\n✅ Successfully generated {output_json_file} with {len(test_cases)} test cases.")
    print("Copy the content of this file and paste it into the Admin Contest Manager.")

if __name__ == "__main__":
    # CONFIGURATION
    # Create a folder named 'raw_tests' and put 'inputs' and 'outputs' folders inside it
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Default assumptions: 
    #   ./raw_tests/inputs contains 1.in, 2.in...
    #   ./raw_tests/outputs contains 1.out, 2.out...
    INPUT_DIR = os.path.join(current_dir, "raw_tests", "inputs") 
    OUTPUT_DIR = os.path.join(current_dir, "raw_tests", "outputs")
    OUTPUT_JSON = os.path.join(current_dir, "tests_dump.json")

    # Create dummy dirs if they don't exist to help the user
    if not os.path.exists(INPUT_DIR):
        os.makedirs(INPUT_DIR)
        os.makedirs(OUTPUT_DIR)
        print(f"Created folders:\n  {INPUT_DIR}\n  {OUTPUT_DIR}\nPut your test files there and run this script again.")
    else:
        generate_json(INPUT_DIR, OUTPUT_DIR, OUTPUT_JSON)
