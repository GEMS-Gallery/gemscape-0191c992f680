import Hash "mo:base/Hash";
import Int "mo:base/Int";

import Array "mo:base/Array";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
  type Gemstone = {
    id: Nat;
    name: Text;
    gemType: Text;
    color: Text;
    rarity: Nat;
    rating: Float;
    ratingCount: Nat;
  };

  stable var nextId: Nat = 0;
  let gemstones = HashMap.HashMap<Nat, Gemstone>(10, Nat.equal, Nat.hash);

  public func addGemstone(name: Text, gemType: Text, color: Text, rarity: Nat) : async Result.Result<Nat, Text> {
    let id = nextId;
    nextId += 1;

    let newGemstone: Gemstone = {
      id = id;
      name = name;
      gemType = gemType;
      color = color;
      rarity = rarity;
      rating = 0;
      ratingCount = 0;
    };

    gemstones.put(id, newGemstone);
    #ok(id)
  };

  public query func getAllGemstones() : async [Gemstone] {
    Array.tabulate(gemstones.size(), func (i: Nat) : Gemstone {
      switch (gemstones.get(i)) {
        case (?gemstone) gemstone;
        case null {
          {
            id = 0;
            name = "";
            gemType = "";
            color = "";
            rarity = 0;
            rating = 0;
            ratingCount = 0;
          }
        };
      }
    })
  };

  public query func getGemstone(id: Nat) : async ?Gemstone {
    gemstones.get(id)
  };

  public func rateGemstone(id: Nat, newRating: Float) : async Result.Result<(), Text> {
    switch (gemstones.get(id)) {
      case (?gemstone) {
        let updatedRatingCount = gemstone.ratingCount + 1;
        let updatedRating = (gemstone.rating * Float.fromInt(gemstone.ratingCount) + newRating) / Float.fromInt(updatedRatingCount);
        
        let updatedGemstone: Gemstone = {
          id = gemstone.id;
          name = gemstone.name;
          gemType = gemstone.gemType;
          color = gemstone.color;
          rarity = gemstone.rarity;
          rating = updatedRating;
          ratingCount = updatedRatingCount;
        };

        gemstones.put(id, updatedGemstone);
        #ok()
      };
      case null #err("Gemstone not found")
    }
  };
}
