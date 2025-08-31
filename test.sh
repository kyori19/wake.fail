#!/bin/bash

# Test runner script for wake.fail
# This script demonstrates how to run different types of tests

echo "🧪 wake.fail Test Suite"
echo "======================"

# Function to run command and report results
run_test() {
    local test_name="$1"
    local command="$2"
    
    echo
    echo "📋 Running $test_name..."
    echo "Command: $command"
    echo "---"
    
    if eval "$command"; then
        echo "✅ $test_name passed!"
    else
        echo "❌ $test_name failed!"
        return 1
    fi
}

# Default to running unit tests only
TEST_TYPE="${1:-unit}"

case "$TEST_TYPE" in
    "unit")
        echo "Running unit tests only..."
        run_test "Unit Tests" "npm test"
        ;;
    "e2e")
        echo "Running E2E tests only..."
        run_test "E2E Tests" "npm run test:e2e"
        ;;
    "all")
        echo "Running all tests..."
        run_test "Unit Tests" "npm test" && \
        run_test "E2E Tests" "npm run test:e2e"
        ;;
    "coverage")
        echo "Running unit tests with coverage..."
        run_test "Unit Tests with Coverage" "npm run test:coverage"
        ;;
    "help")
        echo "Usage: $0 [unit|e2e|all|coverage|help]"
        echo
        echo "Options:"
        echo "  unit     - Run unit tests only (default)"
        echo "  e2e      - Run E2E tests only"
        echo "  all      - Run both unit and E2E tests"
        echo "  coverage - Run unit tests with coverage report"
        echo "  help     - Show this help message"
        echo
        echo "Examples:"
        echo "  $0            # Run unit tests"
        echo "  $0 all        # Run all tests"
        echo "  $0 coverage   # Generate coverage report"
        exit 0
        ;;
    *)
        echo "❌ Unknown test type: $TEST_TYPE"
        echo "Run '$0 help' for usage information."
        exit 1
        ;;
esac

echo
echo "🏁 Test run complete!"