import tiktoken
def count_tokens(text: str, model: str = "gpt-3.5-turbo") -> int:
    """
    Counts the number of tokens in a given text using the specified model's tokenizer.

    Args:
        text (str): The input text to be tokenized and counted.
        model (str): The name of the model whose tokenizer to use. Default is "gpt-3.5-turbo".

    Returns:
        int: The number of tokens in the input text.
    """
    # Get the appropriate encoding for the specified model
    encoding = tiktoken.encoding_for_model(model)
    
    # Encode the text and return the number of tokens
    return len(encoding.encode(text))

print(count_tokens("Hello, how are you?", model="gpt-3.5-turbo"))