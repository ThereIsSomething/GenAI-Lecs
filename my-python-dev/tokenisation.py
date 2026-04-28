import tiktoken

words = ['pencil','apple','me ','no no no','谢谢']

encoding = tiktoken.encoding_for_model("gpt-4o-mini")
newstr = "Hey, Hi! how are you doing nitish?"

for i in words:
    result = encoding.encode(i)
    print(result)


vars = (encoding.encode(newstr))
print (vars)
print(encoding.decode(vars))

num_tokens = len(vars)
print(num_tokens)
for i in vars:
    token_bytes = encoding.decode_single_token_bytes(i)
    print(f"token bytes: {token_bytes}")