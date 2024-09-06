export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Gemstone = IDL.Record({
    'id' : IDL.Nat,
    'gemType' : IDL.Text,
    'ratingCount' : IDL.Nat,
    'name' : IDL.Text,
    'color' : IDL.Text,
    'rarity' : IDL.Nat,
    'rating' : IDL.Float64,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'addGemstone' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat],
        [Result_1],
        [],
      ),
    'getAllGemstones' : IDL.Func([], [IDL.Vec(Gemstone)], ['query']),
    'getGemstone' : IDL.Func([IDL.Nat], [IDL.Opt(Gemstone)], ['query']),
    'rateGemstone' : IDL.Func([IDL.Nat, IDL.Float64], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
