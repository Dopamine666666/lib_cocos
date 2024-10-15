export const GetRichTextTypeWriterArr = (text: string) => {
  let tempStrArr: string[] = [];
  let new_text = text.replace(/\\n/g, '\n');
  let charArr = new_text.replace('{playerName}', '玩家').replace(/<.+?\/?>/g, '').split('');
  tempStrArr = [new_text];

  for(let i = charArr.length; i > 1; i--) {
      let curStr = tempStrArr[charArr.length - i];
      let lastIdx = curStr.lastIndexOf(charArr[i - 1]);
      let leftStr = curStr.slice(0, lastIdx);
      let rightStr = curStr.slice(lastIdx + 1, curStr.length);

      tempStrArr.push(leftStr + rightStr);
  }
  return tempStrArr;
}